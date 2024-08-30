import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from '../../../../../../components/config';
import './NoteCreate.css';

export default function NoteCreate({ item, fetchCart }) {
    const [note, setNote] = useState('');
    const handleSave = () => {
        axios.post(`${Config.baseURL}/api/cart/note/create/${item.id}/`, { note })
            .then(response => {
                fetchCart();
                setNote('');
                // toast.success('Note saved successfully!'); 

            })
            .catch(error => {
                console.error('Error creating note:', error);
            });
    };

    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };

    return (
        <div className='note-cardContent-Create'>
            <div className='card-Note-TextArea-Create'>
                <textarea
                    name='note'
                    className='Note-textarea-Create'
                    value={note}
                    onChange={handleNoteChange}
                    placeholder={item.product?.note_help}
                />
            </div>
            <div className='note-card-but-Save-Create'>
                <button className='card-but-Save-Create' onClick={handleSave}>حفظ</button>
            </div>
            <ToastContainer />
        </div>
    );
}
