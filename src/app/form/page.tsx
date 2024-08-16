"use client"

import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
    q_content: string;
    ans_content: string;
    options: string[];
    correct_option_index: number;
    cat_large: string;
    cat_medium: string;
    cat_small: string;
    ans_status: 'Unanswered' | 'Correct' | 'Incorrect';
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        q_content: '',
        ans_content: '',
        options: ['', '', '', ''],
        correct_option_index: 0,
        cat_large: '',
        cat_medium: '',
        cat_small: '',
        ans_status: 'Unanswered'
    });
    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('option_')) {
            const index = parseInt(name.split('_')[1], 10);
            setFormData((prev) => {
                const options = [...prev.options];
                options[index] = value;
                return { ...prev, options };
            });
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData();
        data.append('q_content', formData.q_content);
        data.append('ans_content', formData.ans_content);
        data.append('correct_option_index', formData.correct_option_index.toString());
        data.append('cat_large', formData.cat_large);
        data.append('cat_medium', formData.cat_medium);
        data.append('cat_small', formData.cat_small);
        data.append('ans_status', formData.ans_content);
        if (image) data.append('image', image);

        formData.options.forEach((option, index) => {
            data.append(`option_${index + 1}`, option);
        });

        try {
            await axios.post('api/forms', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('問題の登録が完了しました。');
        } catch (err) {
            console.error(err);
            alert('問題の登録に失敗しました。');
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <label className='flex mb-3'>
                    <p className='w-36'>問題内容:</p>
                    <textarea name="q_content" id="" onChange={handleChange} value={formData.q_content} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>選択肢 ア:</p>
                    <input className='py-1 px-3' type="text" name='option_0' onChange={handleChange} value={formData.options[0]} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>選択肢 イ:</p>
                    <input className='py-1 px-3' type="text" name="option_1" onChange={handleChange} value={formData.options[1]} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>選択肢 ウ:</p>
                    <input className='py-1 px-3' type="text" name="option_2" onChange={handleChange} value={formData.options[2]} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>選択肢 エ:</p>
                    <input className='py-1 px-3' type="text" name="option_3" onChange={handleChange} value={formData.options[3]} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>正解:</p>
                    <select name="correct_option_index" onChange={handleChange} value={formData.correct_option_index} required>
                        <option value={0}>選択肢 ア</option>
                        <option value={1}>選択肢 イ</option>
                        <option value={2}>選択肢 ウ</option>
                        <option value={3}>選択肢 エ</option>
                    </select>
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>カテゴリー 大:</p>
                    <input className='py-1 px-3' type="text" name="category_large" onChange={handleChange} value={formData.cat_large} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>カテゴリー 中:</p>
                    <input className='py-1 px-3' type="text" name="category_medium" onChange={handleChange} value={formData.cat_medium} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>カテゴリー 小:</p>
                    <input className='py-1 px-3' type="text" name="category_small" onChange={handleChange} value={formData.cat_small} required />
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>解答ステータス:</p>
                    <select name="answer_status" onChange={handleChange} value={formData.ans_status} required>
                        <option value="Unanswered">未回答</option>
                        <option value="Correct">正解</option>
                        <option value="Incorrect">不正解</option>
                    </select>
                </label>
                <label className='flex mb-3'>
                    <p className='w-36'>画像:</p>
                    <input type="file" onChange={handleFileChange} />
                </label>
                <button type="submit" className="relative py-1 px-5 cursor-pointer rounded-3xl border-2 border-solid divide-slate-700 outline-black">登録</button>
            </form>
        </main>
    );
}

export default Form;