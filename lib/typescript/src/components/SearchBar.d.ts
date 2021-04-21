import React from 'react';
interface Props {
    value: string;
    onChangeText(text: string): void;
}
declare const SearchBar: React.FC<Props>;
export default SearchBar;
