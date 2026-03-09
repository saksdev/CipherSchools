const { pool } = require('../config/db');

const executeQuery = async (req, res) => {
    const { query, workspaceId } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    // Basic security: block destructive commands
    const destructiveCommands = ['DROP', 'DELETE', 'TRUNCATE', 'ALTER', 'CREATE', 'GRANT', 'REVOKE'];
    const isDestructive = destructiveCommands.some(cmd => query.toUpperCase().includes(cmd));

    if (isDestructive) {
        return res.status(403).json({ error: 'Destructive commands are not allowed in the sandbox.' });
    }

    // Sanitize workspaceId — only allow letters, numbers, underscores
    if (workspaceId && !/^[a-z0-9_]+$/.test(workspaceId)) {
        return res.status(400).json({ error: 'Invalid workspace ID.' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        if (workspaceId) {
            // Set search_path so user can write "SELECT * FROM products" without schema prefix
            await client.query(`SET LOCAL search_path TO "${workspaceId}", public`);
        }

        const result = await client.query(query);

        // Rollback — practice queries should never persist changes
        await client.query('ROLLBACK');

        res.json({
            success: true,
            rows: result.rows,
            rowCount: result.rowCount,
            fields: result.fields.map(f => f.name)
        });
    } catch (err) {
        await client.query('ROLLBACK').catch(() => { });

        // Friendlier error for missing tables
        let errorMessage = err.message;
        if (err.message.includes('does not exist') && workspaceId) {
            errorMessage = `${err.message}\n\nHint: Make sure the tables are created in Supabase under the "${workspaceId}" schema.`;
        }

        res.status(400).json({
            success: false,
            error: errorMessage
        });
    } finally {
        client.release();
    }
};

module.exports = {
    executeQuery,
};
