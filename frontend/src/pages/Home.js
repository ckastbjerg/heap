import React from 'react';
import Grid, { Row, Col } from '../composers/Grid';
import { Tabs, Page } from '../composers/Module';

import Movies from '../components/Movies';
import Shows from '../components/Shows';
import Games from '../components/Games';

import withTabs, { Tab } from './withTabs';

const Watch = ({ tab, onTabChange }) => (
  <Page>
    <Grid>
      <Row>
        <Col isVisible={!tab || tab === 'theatrical-movies'}>
          <Movies showFilters media="movies" type="theatrical" />
        </Col>
        <Col isVisible={!tab || tab === 'digital-movies'}>
          <Movies showFilters media="movies" type="digital" />
        </Col>
        <Col isVisible={tab === 'shows'}>
          <Shows showFilters media="shows" />
        </Col>
        <Col isVisible={tab === 'games'}>
          <Games showFilters media="games" />
        </Col>
      </Row>
    </Grid>
    <Tabs>
      <Tab
        name="Theatrical movies"
        tab={tab || 'theatrical-movies'}
        onClick={onTabChange}
      >
        Movies
      </Tab>
      <Tab name="Digital movies" tab={tab} onClick={onTabChange}>
        Shows
      </Tab>
      <Tab name="Shows" tab={tab} onClick={onTabChange}>
        Games
      </Tab>
      <Tab name="Games" tab={tab} onClick={onTabChange}>
        Games
      </Tab>
    </Tabs>
  </Page>
);

export default withTabs(Watch);
