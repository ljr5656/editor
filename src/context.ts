import { createContext } from 'react';
import Editor from './editor/editor';

export const EditorContext = createContext<Editor | null>(null);
