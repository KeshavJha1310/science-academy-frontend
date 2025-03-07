import React from 'react';

const Main = () => {
  return (
    <div className="pusher">
      <div className="ui menu asd borderless" style={{ borderRadius: '0!important', border: '0', marginLeft: '260px', WebkitTransitionDuration: '0.1s' }}>
        <a className="item openbtn">
          <i className="icon content"></i>
        </a>
        <a className="item">Messages</a>
        <div className="right menu">
          {/* Rest of the right menu content */}
        </div>
      </div>
    </div>
  );
};

export default Main;
