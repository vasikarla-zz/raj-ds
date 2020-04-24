import React from 'react';
import styles from './SampleComponent.css';

interface SampleComponentProps {
  /** The value for the component to display */
  value?: string;
}

/** A simple component. */
export const SampleComponent = (props: SampleComponentProps) => {
  return <div className={styles.sampleComponent}>This is a SampleComponent component {props.value}</div>;
}

export default SampleComponent;
