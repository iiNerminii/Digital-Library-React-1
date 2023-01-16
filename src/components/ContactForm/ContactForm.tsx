import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseTitle, chooseAuthor, chooseGenre, chooseLength } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

// import { useGetData } from '../../custom-hooks';

// Where do we get this from?
interface ContactFormProps {
    id?:string;
    data?:{}
}

interface ContactState {
    title: string;
    author: string;
    genre: string;
    book_len: string;
}

export const ContactForm = (props:ContactFormProps) => {
    // ask Joel about contactData and state
    const dispatch = useDispatch();
    // let { contactData, getData } = useGetData();
    const store = useStore();
    const title = useSelector<ContactState>(state => state.title);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseTitle(data.title));
            dispatch(chooseAuthor(data.author));
            dispatch(chooseLength(data.book_len));
            dispatch(chooseGenre(data.genre));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Book Title</label>
                    <Input {...register('title')} name="title" placeholder='Title'/>
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <Input {...register('author')} name="author" placeholder='Author'/>
                </div>
                <div>
                    <label htmlFor="book_len">Length of Book</label>
                    <Input {...register('book_len')} name="book_len" placeholder='book_len'/>
                </div>
                <div>
                    <label htmlFor="genre">Genre</label>
                    <Input {...register('genre')} name="genre" placeholder='Genre'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}