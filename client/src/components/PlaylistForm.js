import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import './PlaylistForm.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { createPlaylist } from '../logic/createPlaylist';

const PlaylistForm = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [mood, setMood] = useState('');

    const handleClick = async () => {
        const user = await axios.get('/api/getUser');
        const id = user.data.spotifyId;
        const tokenRes = await axios.get('/api/getToken');
        const token = tokenRes.data;
        createPlaylist(token, mood, playlistName, id);
    }

    const updatePlaylistName = (e) => {
        setPlaylistName(e.target.value);
    }

    const updateMood = (e) => {
        setMood(e.target.value)
        console.log(mood);
    }

    return (
        <Form>
            <Row>
                <Form.Control placeholder="Playlist Name" onChange={updatePlaylistName}/>
                <Form.Control placeholder="Mood" onChange={updateMood}/>
                <Button onClick={handleClick}>Yes</Button>
                
            </Row>
        </Form>
    )
}

export default PlaylistForm;