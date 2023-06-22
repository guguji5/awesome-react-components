import React, { useEffect, useState, useContext } from 'react';
interface Props {}
import { IncidentContext } from './Row';
export default function Index(props: Props) {
  const incident = useContext(IncidentContext);
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      {JSON.stringify(incident)}
    </div>
  );
}
