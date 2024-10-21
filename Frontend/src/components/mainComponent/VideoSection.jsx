import React from 'react';
import './VideoSection.css';
import { useTranslation } from 'react-i18next';
const VideoSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="container-fluid vedio_sec mb-5">
        <div className="sec2">
          <img src="./images/video_sec_bg.png" alt="Background" />
          <div className="centered-text content" id="aaaa">
            <h1>{t('videoSection.title')}</h1>
            <p>{t('videoSection.description')} </p>
            <div className="play-button">
              <img src="./images/play_btn.png" alt="Play Button" />
              <a href="#" id="myButton" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="fa-solid fa-play"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content" style={{ border: 'none', backgroundColor: '#000' }}>
            <div className="modal-body d-flex justify-content-center align-items-center">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/zdeOGuq57MI?si=P_lDGOL4FfA1S6m9"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSection;