import '@lib/polyfills/polyfills-frontend';
import { h, render } from 'preact';

const renderTarget = document.getElementById('root');

render(<h1>UserApp Template</h1>, renderTarget);
