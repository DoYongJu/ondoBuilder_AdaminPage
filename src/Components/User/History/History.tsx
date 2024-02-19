import './History.css';
import TabBar from '../../TabBar/TabBar';

const History =() =>{
    return(
        <div className="history">
            <div className='tabBar'>
                <TabBar/>
            </div>
            <ul>히스토리</ul>
            <ul>사용자의 작업내역을 확인할 수 있습니다.</ul>

        </div>
    );
};
export default History;