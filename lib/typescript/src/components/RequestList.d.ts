import React from 'react';
import NetworkRequestInfo from '../NetworkRequestInfo';
interface Props {
    requests: NetworkRequestInfo[];
    onPressItem: (item: NetworkRequestInfo) => void;
    onShowMore: () => void;
    showDetails: boolean;
}
declare const RequestList: React.FC<Props>;
export default RequestList;
