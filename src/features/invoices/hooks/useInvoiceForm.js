// src/features/invoices/hooks/useInvoiceForm.js
import { useState, useCallback, useRef, useEffect } from 'react';

export function useInvoiceForm() {
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState('');

    const handleFile = useCallback((f) => {
        if (!f) return;
        setFile(f);
        setError('');
        setPreview(f.type.startsWith('image/') ? URL.createObjectURL(f) : null);
    }, []);

    const clearFile = useCallback(() => {
        setFile(null);
        setPreview(null);
    }, []);

    // Cleanup preview URL
    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const validate = useCallback(() => {
        if (!file) {
            setError('يرجى اختيار ملف الإيصال أولاً.');
            return false;
        }
        return true;
    }, [file]);

    return {
        inputRef,
        file,
        preview,
        error,
        setError,
        handleFile,
        clearFile,
        validate,
    };
}