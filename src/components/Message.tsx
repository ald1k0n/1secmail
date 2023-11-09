import {useParams} from 'react-router-dom';
import { useGetMailsByIdQuery } from '../redux/services/baseApi';

import { useAppSelector } from '../hooks';

const Message = () => {
    const {id} = useParams();

    const { domain, login } = useAppSelector(state => state.credentialSlice)
    const {data, isLoading} =  useGetMailsByIdQuery({login ,domain, id:id!})

    if(isLoading) {
        return <div>Loading...</div>
    }

  return (
    <div>
        {
            data?.textBody
        }
    </div>
  )
}

export default Message