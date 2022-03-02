import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Spinner() {

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    return (
        <div style={{width:'100%', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Spin indicator={antIcon} />
        </div>
    )
}

export default Spinner
