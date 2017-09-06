import React, { Component } from 'react';

import Toolbar from './btn_toolbar';
import CallControl from './callcntrl_btn_group';
import SideBarForm from './side_bar_form';
import PreCallButtonGroup from './pre_call_btn_grp';

export default class CallsSideBar extends Component {
  constructor(props) {
    super(props);
    const clickHandlers = ['handleSubmitResponses', 'handleHangUp', 'handleStartCallClick', 'handleOutcomeClick', 'handleNextClick', 'handleStopClick'];
    clickHandlers.forEach((func) => {
      this[func] = this[func].bind(this);
    });
  }

  componentDidMount() {
    if (this.props.contact_id) {
      const { contact_id, getCallContactInfo } = this.props;
      getCallContactInfo(contact_id);
    }
  }

  componentDidUpdate() {
    if (this.props.contact_id) {
      const { contact_id, getCallContactInfo } = this.props;
      getCallContactInfo(contact_id);
    }
  }

  handleStartCallClick() {
    const { updateCallStatus } = this.props;
    return updateCallStatus('IN_PROGRESS');
  }

  handleOutcomeClick(text) {
    const { updateCallOutcome, updateCallStatus } = this.props;
    if (text === 'ANSWERED') {
      const { activateCall } = this.props;
      activateCall();
      return;
    }
    updateCallOutcome(text.toUpperCase());
    updateCallStatus('ATTEMPTED');
  }

  handleNextClick() {
    const { user_id, campaign_id, nextCall } = this.props;
    nextCall(user_id, campaign_id);
  }

  handleStopClick() {
    const { history } = this.props;
    history.push('/volunteers/campaigns');
  }

  handleHangUp() {
    const { inactivateCall, updateCallStatus } = this.props;
    inactivateCall();
    updateCallStatus('HUNG_UP');
  }

  handleSubmitResponses() {
    console.log('THIS DOES NOTHING... NOTHING AT ALL!', this.props);
  }

  render() {
    const { status, call_volunteer_active } = this.props;
    const outcomes = [
      {
        value: 'Answered',
        style: 'success'
      },
      {
        value: 'Bad Number',
        style: 'danger'
      },
      {
        value: 'Do Not Call',
        style: 'danger'
      },
      {
        value: 'No Answer',
        style: 'warning'
      },
      {
        value: 'Left Message',
        style: 'warning'
      },
      {
        value: 'Incomplete',
        style: 'warning'
      }
    ];

    if (status === 'ASSIGNED' && call_volunteer_active) {
      const { current_call_contact_name,
              updateCallStatus,
              history,
              call_id,
              user_id,
              campaign_id,
              updateAttempt,
              releaseCall,
              nextCall,
              clearVolunteerActive } = this.props;
      return (
        <PreCallButtonGroup
          history={history}
          updateCallStatus={updateCallStatus}
          current_call_contact_name={current_call_contact_name}
          call_id={call_id}
          user_id={user_id}
          campaign_id={campaign_id}
          updateAttempt={updateAttempt}
          releaseCall={releaseCall}
          nextCall={nextCall}
          clearVolunteerActive={clearVolunteerActive}
        />
      );
    }
    if (!!status && (status === 'IN_PROGRESS' || status === 'ATTEMPTED' || status === 'HUNG_UP')) {
      const { current_call_contact_name, handleSubmit, call_current_active, outcome } = this.props;

      return (
        <div>
          <div>Now Calling: {current_call_contact_name}</div>
          <Toolbar
            outcomes={outcomes}
            handleOutcome={this.handleOutcomeClick}
          />
          <div>
            <SideBarForm handleSubmit={handleSubmit} />
            <div>
              <CallControl
                call_current_active={call_current_active}
                submitHandler={this.handleSubmitResponses}
                handleHangUp={this.handleHangUp}
                outcome={outcome}
                status={status}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>SideBar Loading</div>
    );
  }
}
