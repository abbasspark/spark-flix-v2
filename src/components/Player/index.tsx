import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './player.scss';

const MediaPlayer = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [url, setUrl] = useState<string>();

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setError(true);
    };
    useEffect(() => {
        return setUrl(`https://vidsrc.pro/embed/movie/${params.id}`);
    }, [params]);
    return (
        <div id="player">
            {isLoading && <div className="loading-indicator">Loading...</div>}
            {error && <div className="error-message">Error loading video.</div>}
            <iframe
                className='iframe'
                src={url}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='Embedded Video'
                onLoad={handleLoad}
                onError={handleError}

            />
        </div >
    );
};

export default MediaPlayer;
