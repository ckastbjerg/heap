import React, { Component } from 'react';
import styled from 'styled-components';
import { Check, X, ChevronDown } from 'react-feather';

const SettingsWrapper = styled.div`
  position: relative;

  select {
    padding: 10px;
    background: transparent;
    height: 40px;
    border: none;
    font-size: 14px;
    cursor: pointer;
    border-top: 1px solid rgba(0, 0, 0, 0.075);
    width: 100%;
    border-radius: 0;
  }
`;

const Expand = styled(ChevronDown)`
  position: absolute;
  top: 12px;
  right: 10px;
  pointer-events: none;
`;

const Settings = ({ viewSetting, onChangeViewSetting }) => (
  <SettingsWrapper>
    <select value="full">
      <option value="full">View full profile</option>
      <option value="difference">View differences</option>
      <option value="shared">Shared view</option>
    </select>
    <Expand size={16} />
  </SettingsWrapper>
);

export default Settings;
