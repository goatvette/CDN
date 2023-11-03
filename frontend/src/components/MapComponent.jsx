import React from 'react';
import Iframe from 'react-iframe';

const MapComponent = () => {
  return (
    <Iframe
      url='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7227.841409014351!2d55.304768392817756!3d25.07067661117035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6f8fa3e0fe15%3A0x47d99efb4e3fa427!2sGlobal%20Village!5e0!3m2!1sen!2sae!4v1697565856934!5m2!1sen!2sae'
      width='100%'
      height='350'
      allowFullScreen
      loading='lazy'
      frameBorder='0'
    />
  );
};

export default MapComponent;
