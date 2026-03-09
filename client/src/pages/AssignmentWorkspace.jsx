import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import SqlEditor from '../components/SqlEditor';

const AssignmentWorkspace = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [hint, setHint] = useState('');
    const [loadingHint, setLoadingHint] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAssignment = async () => {
            const res = await api.get(`/api/assignments/${id}`);
            setAssignment(res.data);
        };
        fetchAssignment();
    }, [id]);

    const handleExecute = async () => {
        setError('');
        setResults(null);
        try {
            const res = await api.post('/api/assignments/execute', {
                query,
                workspaceId: assignment.workspaceId,
            });
            setResults(res.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred during execution');
        }
    };

    const handleGetHint = async () => {
        setLoadingHint(true);
        setHint('');
        try {
            const res = await api.post('/api/assignments/hint', {
                query,
                assignment,
                error: error || undefined,
            });
            setHint(res.data.hint);
        } catch (err) {
            setHint(err.response?.data?.error || 'Failed to get hint. Please try again.');
        } finally {
            setLoadingHint(false);
        }
    };

    if (!assignment) return <div>Loading...</div>;

    return (
        <div className="workspace container">
            <div className="workspace__left">
                <section className="workspace__question">
                    <h2>{assignment.title}</h2>
                    <p>{assignment.question}</p>
                </section>

                <section className="workspace__schemas">
                    <h3>Available Tables</h3>
                    {assignment.sampleTables.map(table => (
                        <div key={table.tableName} className="table-schema">
                            <strong>{table.tableName}</strong>
                            <ul>
                                {table.columns.map(col => (
                                    <li key={col.columnName}>{col.columnName} ({col.dataType})</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            </div>

            <div className="workspace__right">
                <SqlEditor value={query} onChange={setQuery} onExecute={handleExecute} />

                <div className="workspace__actions">
                    <button className="button button--secondary" onClick={handleGetHint} disabled={loadingHint}>
                        {loadingHint ? 'Getting Hint...' : 'Get AI Hint'}
                    </button>
                </div>

                {hint && <div className="hint-box">{hint}</div>}

                <div className="workspace__results">
                    {error && <div className="result-error">{error}</div>}
                    {results && (
                        <table className="results-table">
                            <thead>
                                <tr>{results.fields.map(f => <th key={f}>{f}</th>)}</tr>
                            </thead>
                            <tbody>
                                {results.rows.map((row, i) => (
                                    <tr key={i}>{results.fields.map(f => <td key={f}>{row[f]}</td>)}</tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignmentWorkspace;
