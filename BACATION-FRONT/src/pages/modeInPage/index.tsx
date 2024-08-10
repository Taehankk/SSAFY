import React from 'react';
import { useState } from 'react';
import { OpenViduSession } from '../../components/organisms/openViduSession'; // 세션 관련 컴포넌트 import

export const ModeInPage = () => {
  const [babyName, setBabyName] = useState('');

  const [userName, setUserName] = useState('');

  const [session, setSession] = useState(false);

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBabyName(e.target.value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleJoinSession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSession(true);
  };

  return (
    <div className="container">
      {!session && (
        <div id="join" className="jumbotron vertical-center">
          <form className="form-group" onSubmit={handleJoinSession}>
            <div>
              <label>User: </label>
              <input
                className="form-control"
                type="text"
                id="userName"
                placeholder="your name"
                value={userName}
                onChange={handleChangeUserName}
                required
              />
            </div>
            <div>
              <label>Baby: </label>
              <input
                className="form-control"
                type="text"
                id="sessionId"
                placeholder="baby name"
                value={babyName}
                onChange={handleChangeSessionId}
                required
              />
            </div>
            <div className="text-center">
              <input
                className="btn btn-lg btn-success"
                name="commit"
                type="submit"
                value="JOIN"
              />
            </div>
          </form>
        </div>
      )}
      {session && (
        <OpenViduSession mySessionId={babyName} myUserName={userName} />
      )}
    </div>
  );
};
