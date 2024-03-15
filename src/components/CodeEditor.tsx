import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror'; 
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

const CodeEditor: React.FC = () => {
  const editorRef = useRef<HTMLTextAreaElement | null(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = CodeMirror(editorRef.current, {
        mode: 'javascript',
        lineNumbers: true,
      });
    }
  }, []);

  return <textarea ref={editorRef} />;

}

export default CodeEditor;
