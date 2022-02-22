import { ReactNode } from 'react';


declare global {
  interface Window { DarkReader: any; }
}
export interface BaseComponentProps {
  children?: ReactNode;
}