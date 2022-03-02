import React, { useEffect, useState } from 'react';
import { Switch, Input, Button } from 'antd';
import { io } from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateReduxWebsiteAbout } from '../../../../../../../../../store/actions/customer';

const { TextArea } = Input;

const AttorneyAbout = ({ websiteAbout, updateReduxWebsiteAbout, handleactionupdatewebsiteabout, handleactionupdatewebsiteaboutpersonalinformation, handleactionupdatewebsiteaboutlawfirmthankyoupage, customerdetails }) => {
    const [about, setAbout] = useState('');
    const [showAttorneyWebsiteInfo, setShowAttorneyWebsiteInfo] = useState(false);
    const [showPersonalInformation, setShowPersonalInformation] = useState(false);
    const [socket, setsocket] = useState(null);

    useEffect(() => {
        setAbout(websiteAbout && websiteAbout?.about)
        console.log("from website avout", customerdetails)
        setShowAttorneyWebsiteInfo(websiteAbout?.show_attorney_website_info == 1 ? true : false)
        console.log('About:', about)
    }, [websiteAbout])

    useEffect(() => {
        console.log('process.env.NX_HOST', process.env.NX_HOST)
        const s = io(`${process.env.NX_HOST}/attorneys/account/web/about`);
        setsocket(s);
        console.log('socket id attorney testimonial Create', s.id)
        // client-side
        s.on("connect", () => {
            console.log('connect socket id website about', s.id);
        });
        return () => {
            s.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null)
            return;
        console.log('sockit useeffect in attorney website about update')
        socket.on('websiteAbout', (m) => {
            console.log('m in attorney website about update', JSON.parse(m));
            let dbdata = JSON.parse(m);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxWebsiteAbout(dbdata);
        });

        socket.on('websiteThankYou', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website thank you page', dbdata[0]);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxWebsiteAbout(dbdata[0]);
        });

        socket.on('websitePersonalInfo', (m) => {
            let dbdata = JSON.parse(m);
            console.log('m in attorney website personal info', dbdata[0]);
            // if(dbdata.attorney_id===customerdetails.attorney_id){
            //     updateReduxTestimonial(obj);
            // }
            updateReduxWebsiteAbout(dbdata[0]);
        });
    }, [socket]);

    const handleUpdateWebsiteAbout = async () => {
        await handleactionupdatewebsiteabout(about, customerdetails?.attorney_id);
        // console.log('I was called inside attorneyAbout');
    }

    const handleShowAttorneyWebsiteInfo = async () => {
        await handleactionupdatewebsiteaboutlawfirmthankyoupage(!showAttorneyWebsiteInfo, customerdetails?.attorney_id);
    }

    const handleShowPersonalInformation = async () => {
        await handleactionupdatewebsiteaboutpersonalinformation(showPersonalInformation, customerdetails?.attorney_id)
    }
    return (
        <>
            {
                window.innerHeight > 575 && window.innerWidth > 575 ?
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%', marginBottom: '10px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', minWidth: '230px', width: '48%', marginRight: '10px' }}>
                                <div style={{ marginRight: '10px' }}>Law Firm Thank You Page</div>
                                <Switch checked={showAttorneyWebsiteInfo} onClick={handleShowAttorneyWebsiteInfo} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', minWidth: '230px', width: '48%' }}>
                                <div style={{ marginRight: '10px' }}>Personal Information</div>
                                <Switch checked={showPersonalInformation} onClick={handleShowPersonalInformation} />
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={handleUpdateWebsiteAbout}>Update</Button>
                            </div>

                        </div>
                        <div style={{ width: '100%', marginBottom: '10px' }}>
                            <TextArea rows={4} placeholder={'About'} value={about} onChange={(e) => { setAbout(e.target.value) }}></TextArea>
                        </div>
                    </div>
                    :
                    <div style={{ width: '100%' }}>
                        <div style={{ width: '100%', marginBottom: '10px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', minWidth: '230px', width: '100%', marginBottom: 10 }}>
                                <div style={{ marginRight: '10px' }}>{"LawfirmThankyouPage"}</div>
                                <Switch defaultChecked={showAttorneyWebsiteInfo == 1 ? true : false} onChange={() => { setShowAttorneyWebsiteInfo(!showAttorneyWebsiteInfo) }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', minWidth: '230px', width: '100%' }}>
                                <div style={{ marginRight: '10px' }}>{"PersonalInformation"}</div>
                                <Switch />
                            </div>
                        </div>
                        <div style={{ width: '100%', marginBottom: '10px' }}>
                            <TextArea rows={4} placeholder={"About"} value={websiteAbout?.about} />
                        </div>
                    </div>
            }
        </>
    )
}

AttorneyAbout.propTypes = {
    updateReduxWebsiteAbout: PropTypes.func.isRequired
}

export default connect(null, { updateReduxWebsiteAbout })(AttorneyAbout);