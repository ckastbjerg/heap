import React from 'react';

import { color3 } from '../../../tokens';

import getDisplayDate from '../../../utils/getDisplayDate';

import {
  Action,
  Actions,
  BackgroundImage,
  Badge,
  Bottom,
  CountryFlag,
  Date,
  Meta,
  Rating,
  Root,
  Title,
  Top
} from './ListItemElements';
import {
  Star,
  CheckCircle,
  MinusCircle,
  PlusCircle,
  MapPin,
  Heart
} from 'react-feather';

const countryCodeToEmoji = {
  DK: '🇩🇰',
  US: '🇺🇸'
};

const ListItem = ({
  backgroundImage,
  title,
  rating,
  date,
  dateCountryCode,
  isUpdated,
  url,
  onAdd,
  onArchive,
  onDelete,
  onPin,
  viewAsUid
}) => (
  <Root>
    <BackgroundImage src={backgroundImage} />
    <Meta>
      <Top>
        <Title href={url}>{title}</Title>
      </Top>
      <Bottom>
        <Rating>
          <Star size="11" color={color3} style={{ marginRight: '3px' }} />
          {Math.round(rating)}
        </Rating>
        <Date>
          {getDisplayDate(date)}
          {dateCountryCode && (
            <CountryFlag>{countryCodeToEmoji[dateCountryCode]}</CountryFlag>
          )}
        </Date>
      </Bottom>
    </Meta>
    {isUpdated && <Badge>Updated</Badge>}
    {!viewAsUid && (
      <Actions>
        <Action>
          <MapPin title="Save for later" onClick={onPin} size="20" />
        </Action>
        <Action>
          <Heart size="20" />
        </Action>
        <Action>
          <CheckCircle title="Archive" onClick={onArchive} size="20" />
        </Action>
        <Action>
          <MinusCircle title="Delete" onClick={onDelete} size="20" />
        </Action>
      </Actions>
    )}
    {viewAsUid && (
      <Actions>
        <Action>
          <PlusCircle title="Add" onClick={onAdd} size="20" />
        </Action>
      </Actions>
    )}
  </Root>
);

export default ListItem;
