 
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from '../../../../../../components/config';
import './EditNote.css';
 

export default function EditNote({ noteItem, fetchCart }) {
    const [note, setNote] = useState(noteItem.note);
    const [isEditing, setIsEditing] = useState(false);
 


    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        try {
            const response = await axios.put(`${Config.baseURL}/api/cart/notes/${noteItem.id}/`, { note });
            fetchCart();
            // toast.success('Note saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            // toast.error('Failed to save the note.');
        }
    };

    const handleDeleteClick = async () => {
        try {
            const response = await axios.delete(`${Config.baseURL}/api/cart/notes/${noteItem.id}/`);
            fetchCart();
            // toast.success('Note deleted successfully!');
        } catch (error) {
            console.error('Error:', error);
            // toast.error('Failed to delete the note.');
        }
    };

    return (
        <>
            <ToastContainer />
            <button className='card-but' onClick={handleEditClick}>تعديل</button>
            <button className='card-but' onClick={handleDeleteClick}>حذف</button>
            {isEditing && (
                <div className='card-Modal-Note'>
                    <div className='card-modal-content'>
                        <div className='card-Note-TextArea'>
                            <textarea
                                name='note'
                                className='Note-textarea'
                                value={note}
                                onChange={handleNoteChange}
                                placeholder='Edit your note here'
                            />
                        </div>
                        <div className='note-card-but-Save'>
                            <button className='card-but-Save' onClick={handleSaveClick}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
