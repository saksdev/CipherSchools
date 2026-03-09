import React from 'react';
import Editor from '@monaco-editor/react';

const SqlEditor = ({ value, onChange, onExecute }) => {
    return (
        <div className="sql-editor">
            <div className="sql-editor__header">
                <span>SQL Query</span>
                <button className="button button--primary" onClick={onExecute}>Run Query</button>
            </div>
            <Editor
                height="300px"
                defaultLanguage="sql"
                theme="vs-dark"
                value={value}
                onChange={onChange}
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default SqlEditor;
