import React, {useState,useEffect} from 'react';
import { Table, Card } from 'antd';
import AffiliatesTable from './AffiliatesTable/AffiliatesTable';
import AffiliatesCardDetails from './AffiliatesCardDetails/AffiliatesCardDetails';
// import AffiliatesList from '../../../../../Components/AffiliatesMobile/AffiliatesList/AffiliatesList';

const AffiliatesSection = () => {
    const [minimizetablewidth, setminimizetablewidth] = useState(50);
    const [minimizetable, setminimizetable] = useState(false);

    const handleTableWidthChange = (value) =>{
        // console.log('value ',value);
        setminimizetablewidth(value);
    }

    const handleMinimizeTableChange = () =>{
        // console.log('value ',value);
        setminimizetable(!minimizetable);
    }

    return (
        <div style={{width:'100%',minHeight:'calc(-64px + 100vh)',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
            <div style={{width:minimizetable?'0%':`${minimizetablewidth}%`,minHeight:'100%', display:window.innerWidth > 575 && !minimizetable ? 'block' : 'none'}}>
                <AffiliatesTable handleTableWidthChange={handleTableWidthChange} minimizetablewidth={minimizetablewidth} handleMinimizeTableChange={handleMinimizeTableChange} minimizetable={minimizetable} />
            </div>
            <div style={{width:minimizetable?'100%':`${100-minimizetablewidth}%`,minHeight:'100%', display:window.innerWidth > 575 ? 'block' : 'none'}}>
                <AffiliatesCardDetails handleMinimizeTableChange={handleMinimizeTableChange} minimizetable={minimizetable} />
            </div>
            {/* <div style={{display:window.innerWidth <= 575 ? 'block' : 'none', width:'100%'}}>
                <AffiliatesList/>
            </div> */}
        </div>
    )
}

export default AffiliatesSection;
