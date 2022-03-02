import { useState, useEffect} from 'react';
import { Table } from 'antd';
import './LeadsTable.css';
import FilterTable from './FilterTable/FilterTable';
import {updateUserPreference,handletosetleadDetails,getLeadAnalyticsData,updateReduxLeads, getAssignedAttorney, getEligibleAttorney, getAllAttorneysforfilter, updateallleadsfromsockets, updateLeadDetailsFromSockets,startLoading } from '../../../store/actions/lead';
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { io } from "socket.io-client";

const LeadsTable = ({startLoading,user_sel_cols_lead,updateUserPreference,updateReduxLeads,collapsed,handleTableWidthChange,minimizetablewidth,handleMinimizeTableChange,minimizetable,handleMinimizeCardDetailsChange,minimizeCardDetails, leads, leadfilter, leadAttorney, handletosetleadDetails,getLeadAnalyticsData, getAssignedAttorney, getEligibleAttorney, getAllAttorneysforfilter, updateallleadsfromsockets, updateLeadDetailsFromSockets, lead_details, allleads, config_test_mode}) =>{
    const [selectedcolumns, setselectedcolumns] = useState([]);
    const [allcolumns, setallcolumns] = useState();
    const [selectedcolumnnames, setselectedcolumnnames] = useState(user_sel_cols_lead);
    const [data, setdata] = useState([])
    const [socket, setsocket] = useState(null);
    const [conftestmodestate, setconftestmodestate] = useState(false);
    const [allleadstempobj, setallleadstempobj] = useState({leadsTestModeTrue:[],leadsTestModeFalse:[]});
    const [templeaddetails, settempleaddetails] = useState([]);
    const [tableloading, settableloading] = useState(true);

    const fixedcolumns = [
        {
            title:'Arrival Time',
            dataIndex:'created_at',
            key:'created_at',
            width:150,
            align:'center',
            ellipsis: true,
            fixed: 'left',
            defaultSortOrder: 'descending',
            sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at), //moment(text).tz("America/New_York")
            // responsive: ['xs','sm'],
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{moment(text).tz("America/New_York").format('MM-DD-YYYY HH:mm:ss')}</span>,//momentTimezone //'Asia/Calcutta'
        },
        {
            title:'Name',
            dataIndex:'lead_name',
            key:'lead_name',
            width:150,
            ellipsis: true,
            align:'center',
            fixed: 'left',
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
    ]

    useEffect(() => {
        handleTableColms();
    }, [selectedcolumnnames])

    useEffect(()=>{
        handleTableColms();
        let allcolnamesarr = [];
        columns.map(col=>{
            allcolnamesarr.push(col.title) 
        })
        getAllAttorneysforfilter();  // fetches all the attorneys to be loaded in redux
        setallcolumns(allcolnamesarr);
        console.log('process.env.NX_HOST',process.env.NX_HOST)
        const s = io(`${process.env.NX_HOST}/leads`);  // namespace for leads /leads
        setsocket(s);
        console.log('socket id in leads',s.id)
        // client-side
        s.on("connect", () => {
            console.log('connect socket id in leads',s.id); 
        });

        return () => {
        s.disconnect();
        }
    },[]);


    useEffect(() => {
        setconftestmodestate(config_test_mode);
        // settableloading(true);
        startLoading()
        console.log('useeffect details config_test_mode ',config_test_mode)
    }, [config_test_mode])


    useEffect(() => {
        if(socket === null)
            return;

        console.log('sockit useeffect')
        socket.on('message',  (m) => {
        console.log('config_test_mode ',config_test_mode, Boolean(config_test_mode) == true, Boolean(config_test_mode) == false);
        console.log('conftestmodestate ',conftestmodestate, Boolean(conftestmodestate) == true, Boolean(conftestmodestate) == false);
        let {leadsTestModeTrue,leadsTestModeFalse} = JSON.parse(m);
        setallleadstempobj({leadsTestModeTrue,leadsTestModeFalse});  //the two array are saved in state variable which triggers the useffect var for the same from which we check the test mode and save the respective data in the redux var
        console.log('leadsTestModeTrue ',leadsTestModeTrue);
        console.log('leadsTestModeFalse ',leadsTestModeFalse);
        }); 


        //temp comment
        socket.on('leads',  async (m) => {
            console.log('m',JSON.parse(m)); 
            let leads = await JSON.parse(m)
            console.log('leads',leads); 
            console.log('lead_details  ',lead_details)
            console.log('lead_details && lead_details.lead_id == leads[0].lead_id ',lead_details && lead_details.lead_id == leads[0].lead_id)
            settempleaddetails(leads);   // is saved in a state var inorder
            });
        
            socket.on('assign2attorney',  async (m) => {
                console.log('m in assign 2 attorney',JSON.parse(m)); 
                let leads = await JSON.parse(m);
                updateReduxLeads(leads);
                // settempleaddetails(leads);   // is saved in a state var inorder
                }); 

    }, [socket]);

    const handleallleadupdate = (leadsTestModeTrue,leadsTestModeFalse) =>{
        console.log('config_test_mode in upadet fn ',config_test_mode)
        if(Boolean(config_test_mode) == true){
           return updateallleadsfromsockets(leadsTestModeTrue)
        }
        else{
           return updateallleadsfromsockets(leadsTestModeFalse)
        }
    }

    useEffect(() => {
        if(allleadstempobj.leadsTestModeTrue.length > 0 || allleadstempobj.leadsTestModeFalse.length > 0){
            // leadsTestModeTrue,leadsTestModeFalse
            handleallleadupdate(allleadstempobj.leadsTestModeTrue,allleadstempobj.leadsTestModeFalse);
        }
    }, [allleadstempobj])

    useEffect(() => {
        if(lead_details && templeaddetails.length > 0 && lead_details.lead_id != templeaddetails[0].lead_id)
                return ;
        if(lead_details && templeaddetails.length > 0 && lead_details.lead_id == templeaddetails[0].lead_id){
            updateLeadDetailsFromSockets(templeaddetails); //dont need to update eligible attorney because only mark action were chnages for the same displayed lead
        }
    }, [templeaddetails])

    useEffect(() => {
 
        if(leads.allleads && leads.selected_lead_type === ""){
           
            let filt = handlegenfilter();
            console.log('filt', filt)
            let arr =  leads.allleads.filter(d=>{          
                if(JSON.stringify(filt) === JSON.stringify({})){
                    return true;
                }
                if(JSON.stringify(filt) !== JSON.stringify({})){
                    for (var key in filt) {

                        if (filt[key] === undefined || d[key] !== filt[key])
                            return false;
                        }
                        return true;
                }
            })
           
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate == '' && leadfilter.lead_filter.todate ==''){
                arr =  arr.filter(leaditem=> leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1  );
            }
          
            if(leadfilter.lead_filter.CaseTypes.length == 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){ //moment(text).tz("America/New_York")
              arr =  arr.filter(leaditem=> ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format())));
            }
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){
                arr =  arr.filter(leaditem=> (leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1) && ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format()))  );
            }

                if(Object.keys(leadAttorney).length !== 0){
                    console.log('Object.keys(leadAttorney).length !== 0 ',Object.keys(leadAttorney).length !== 0);
                    arr =  arr.filter(leaditem=> leadAttorney.attorney_practice_areas.includes(leaditem.lead_case_type) );
                }

            setdata(arr);
        }
        if(leads.allleads && leads.selected_lead_type !== ""){
            let filt = handlegenfilter();
            console.log('filt', filt)
            let arr =  leads.allleads.filter(d=>{
                if(d.lead_status_value == leads.selected_lead_type){
                    if(JSON.stringify(filt) === JSON.stringify({})){
                        return true;
                    }
                    if(JSON.stringify(filt) !== JSON.stringify({})){
                        for (var key in filt) {
                            if (filt[key] === undefined || d[key] !== filt[key])
                              return false;
                          }
                          return true;
                    }
                }

            })
            
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate == '' && leadfilter.lead_filter.todate ==''){
                arr =  arr.filter(leaditem=> leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1  );
            }
        
            if(leadfilter.lead_filter.CaseTypes.length == 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){
               arr =  arr.filter(leaditem=> ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format())));
            }
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){
                arr =  arr.filter(leaditem=> (leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1) && ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format()))  );
            }

                if(Object.keys(leadAttorney).length !== 0){
                    console.log('Object.keys(leadAttorney).length !== 0 ',Object.keys(leadAttorney).length !== 0);
                    arr =  arr.filter(leaditem=>leadAttorney.attorney_practice_areas.includes(leaditem.lead_case_type));
                }


            setdata(arr);

        }
        settableloading(false);
    }, [allleads])

    useEffect(() => {

        if(leads.allleads && leads.selected_lead_type === ""){
            let filt = handlegenfilter();
            console.log('filt', filt)
            let arr =  leads.allleads.filter(d=>{          
                if(JSON.stringify(filt) === JSON.stringify({})){
                    return true;
                }
                if(JSON.stringify(filt) !== JSON.stringify({})){
                    for (var key in filt) {
                        if (filt[key] === undefined || d[key] !== filt[key])
                            return false;
                        }
                        return true;
                }
            })
            
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate == '' && leadfilter.lead_filter.todate ==''){
                arr =  arr.filter(leaditem=> leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1  );
            }
            if(leadfilter.lead_filter.CaseTypes.length == 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){ 
                arr =  arr.filter(leaditem=> ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format())));
            }
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){
                arr =  arr.filter(leaditem=> (leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1) && ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format()))  );
            }

            //attorney
                if(Object.keys(leadAttorney).length !== 0){
                    console.log('Object.keys(leadAttorney).length !== 0 ',Object.keys(leadAttorney).length !== 0);
                    arr =  arr.filter(leaditem=> leadAttorney.attorney_practice_areas.includes(leaditem.lead_case_type) );
                }

            setdata(arr);
        }
        if(leads.allleads && leads.selected_lead_type !== ""){
            let filt = handlegenfilter();
            console.log('filt', filt)
            let arr =  leads.allleads.filter(d=>{
                if(d.lead_status_value == leads.selected_lead_type){
                    if(JSON.stringify(filt) === JSON.stringify({})){
                        return true;
                    }
                    if(JSON.stringify(filt) !== JSON.stringify({})){
                        for (var key in filt) {
                            if (filt[key] === undefined || d[key] !== filt[key])
                              return false;
                          }
                          return true;
                    }
                }

            })
            
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate == '' && leadfilter.lead_filter.todate ==''){
                arr =  arr.filter(leaditem=> leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1  );
            }
            if(leadfilter.lead_filter.CaseTypes.length == 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){ 
                arr =  arr.filter(leaditem=> ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format())));
            }
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){
                arr =  arr.filter(leaditem=> (leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1) && ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format()))  );
            }

            //attorney
                if(Object.keys(leadAttorney).length !== 0){
                    console.log('Object.keys(leadAttorney).length !== 0 ',Object.keys(leadAttorney).length !== 0);
                    arr =  arr.filter(leaditem=>leadAttorney.attorney_practice_areas.includes(leaditem.lead_case_type));
                }

            setdata(arr);

        }
    }, [leads])

  

    useEffect(() => {
        if(leads.allleads && leads.selected_lead_type === ""){
            let filt = handlegenfilter();
            console.log('filt', filt)
            let arr =  leads.allleads.filter(d=>{        
                if(JSON.stringify(filt) === JSON.stringify({})){
                    return true;
                }
                if(JSON.stringify(filt) !== JSON.stringify({})){
                    for (var key in filt) {
                        if (filt[key] === undefined || d[key] !== filt[key])
                            return false;
                        }
                        return true;
                }
            })
           
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate == '' && leadfilter.lead_filter.todate ==''){
                arr =  arr.filter(leaditem=> leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1  );
            }
            if(leadfilter.lead_filter.CaseTypes.length == 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){ //moment(text).tz("America/New_York")
                arr =  arr.filter(leaditem=> ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format())));
            }
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){
                arr =  arr.filter(leaditem=> (leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1) && ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format()))  );
            }

            //attorney
                if(Object.keys(leadAttorney).length !== 0){
                    console.log('Object.keys(leadAttorney).length !== 0 ',Object.keys(leadAttorney).length !== 0);
                    arr =  arr.filter(leaditem=>leadAttorney.attorney_practice_areas.includes(leaditem.lead_case_type) );
                }
            setdata(arr);

            
        }
        if(leads.allleads && leads.selected_lead_type !== ""){
            let filt = handlegenfilter();
            console.log('filt', filt)
            let arr =  leads.allleads.filter(d=>{
                if(d.lead_status_value == leads.selected_lead_type){
                    if(JSON.stringify(filt) === JSON.stringify({})){
                        return true;
                    }
                    if(JSON.stringify(filt) !== JSON.stringify({})){
                        for (var key in filt) {
                            if (filt[key] !== undefined && d[key] !== filt[key])
                              return false;
                          }
                          return true;
                    }
                }

            })
         
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate == '' && leadfilter.lead_filter.todate ==''){
                arr =  arr.filter(leaditem=> leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1  );
            }
      
            if(leadfilter.lead_filter.CaseTypes.length == 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){ //moment(text).tz("America/New_York")
                arr =  arr.filter(leaditem=> ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format())));
            }
           
            if(leadfilter.lead_filter.CaseTypes.length > 0 && leadfilter.lead_filter.fromdate !=='' && leadfilter.lead_filter.todate !==''){
                arr =  arr.filter(leaditem=> (leadfilter.lead_filter.CaseTypes.indexOf(leaditem.lead_case_type) !== -1) && ((moment(leadfilter.lead_filter.fromdate).tz("America/New_York").format()) <= (moment(leaditem.created_at).tz("America/New_York").format()))  && ((moment(leadfilter.lead_filter.todate).tz("America/New_York").format()) >= (moment(leaditem.created_at).tz("America/New_York").format()))  );
            }

            //attorney
                if(Object.keys(leadAttorney).length !== 0){
                    console.log('Object.keys(leadAttorney).length !== 0 ',Object.keys(leadAttorney).length !== 0);
                    arr =  arr.filter(leaditem=> leadAttorney.attorney_practice_areas.includes(leaditem.lead_case_type) );
                }

            setdata(arr);

        }
    }, [leadfilter])

    const handleTableColms = () =>{
        let colarr = [];
        columns.map(item=>{
            if(selectedcolumnnames.includes(item.title)){
                colarr.push(item);
            }
        });
        setselectedcolumns(colarr);
    }

    const handlegenfilter = () =>{
        let filt = {}
            if(leadfilter.lead_filter.channel !== null && leadfilter.lead_filter.channel !== ""){
                filt.channel = leadfilter.lead_filter.channel;
            }
            if(leadfilter.lead_filter.LeadName !== null && leadfilter.lead_filter.LeadName !== ""){
                filt.lead_name = leadfilter.lead_filter.LeadName;
            }
            if(leadfilter.lead_filter.LeadEmail !== null && leadfilter.lead_filter.LeadEmail !== ""){
                filt.lead_email = leadfilter.lead_filter.LeadEmail;
            }
            if(leadfilter.lead_filter.LeadContact !== null && leadfilter.lead_filter.LeadContact !== ""){
                filt.lead_contact = leadfilter.lead_filter.LeadContact;
            }
            if(leadfilter.lead_filter.LeadLocation !== null && leadfilter.lead_filter.LeadLocation !== ""){
                filt.lead_location = leadfilter.lead_filter.LeadLocation;
            }
            return filt;
    }

    let columns = [
        {
            title:'Status',
            dataIndex:'lead_status_value',
            key:'lead_status_value',
            align:'center',
            ellipsis: true,
            filters: [
                { text: 'New', value: 'New' },
                { text: 'Disputed', value: 'Disputed' },
                { text: 'Refunded', value: 'Refunded' },
                { text: 'Assigned', value: 'Assigned' },
                { text: 'Purchased', value: 'Purchased' },
                { text: 'Archived', value: 'Archived' },
              ],
            onFilter: (value, record) => {
                    if(record.lead_status_value){
                        return record.lead_status_value.indexOf(value) === 0
                    }
               return;
            },
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Case Type',
            dataIndex:'lead_case_type',
            key:'lead_case_type',
            align:'center',
            ellipsis: true,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Location',
            dataIndex:'lead_location',
            key:'lead_location',
            align:'center',
            ellipsis: true,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Channel',
            dataIndex:'channel',
            key:'channel',
            align:'center',
            ellipsis: true,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
        {
            title:'Phone',
            dataIndex:'lead_contact',
            key:'lead_contact',
            align:'center',
            ellipsis: true,
            render: text => <span style={{padding:'0px',margin:'0px',fontSize:'12px'}}>{text}</span>,
        },
    ];
    
    const setEditedColms = async (value) =>{
        console.log('setEditedColms ',value);
        setselectedcolumnnames(value);
        await updateUserPreference(value)
    }

    return (
        <div style={{padding:'0px 14px 5px 14px', background:'rgb(244, 245, 247)', width:'100%',height:'100%'}}>
            <div className="filterdwd" style={{display:'flex',flexDirection:'row',width:'100%'}}>
                <FilterTable 
                    handleTableWidthChange={handleTableWidthChange} 
                    minimizetablewidth={minimizetablewidth} 
                    handleMinimizeTableChange={handleMinimizeTableChange} 
                    minimizetable={minimizetable} 
                    handleMinimizeCardDetailsChange={handleMinimizeCardDetailsChange} 
                    minimizeCardDetails={minimizeCardDetails} 
                    selectedcolumnnames={selectedcolumnnames} 
                    allcolumns={allcolumns} 
                    setEditedColms={setEditedColms}
                />
            </div> 
            <Table
                className="tableclass"
                columns={[...fixedcolumns,...selectedcolumns]} 
                dataSource={data} 
                  pagination={{defaultPageSize:100, 
                    pageSizeOptions:[10,20,50,100,500,1000]
                }}
                size="small"
                style={{cursor:'pointer'}}
                onRow={(record, rowIndex) => {
                    return {
                      onClick: event => {
                            handletosetleadDetails(record.lead_id);
                            getLeadAnalyticsData(record.lead_id);
                            getEligibleAttorney(record.lead_id);
                        }, // click row
                      onDoubleClick: event => {}, // double click row
                      onContextMenu: event => {}, // right button click row
                      onMouseEnter: event => {}, // mouse enter row
                      onMouseLeave: event => {}, // mouse leave row
                    };
                  }}
                scroll={{
                    y: '76.5vh', //834 //latest '77.5vh'
                    x: 'calc(600px + 50%)',
                  }}
            />
        </div>
    )
}

LeadsTable.propTypes = {
    handletosetleadDetails: PropTypes.func.isRequired,
    getLeadAnalyticsData: PropTypes.func.isRequired,
    getAssignedAttorney: PropTypes.func.isRequired, 
    getEligibleAttorney: PropTypes.func.isRequired,
    getAllAttorneysforfilter: PropTypes.func.isRequired,
    updateallleadsfromsockets: PropTypes.func.isRequired,
    updateLeadDetailsFromSockets: PropTypes.func.isRequired,
    updateReduxLeads: PropTypes.func.isRequired,
    updateUserPreference: PropTypes.func.isRequired,
    startLoading:PropTypes.func.isRequired
  };

const mapStateToProps = (state) => ({
    leads: state.leads,
    allleads: state.leads.allleads,
    leadfilter: state.leadfilter,
    lead_details: state.leads.lead_details,
    leadAttorney: state.leadfilter.lead_filter.Attorney,
    config_test_mode : state.config.config_test_mode,
    user_sel_cols_lead: state.leads.user_sel_cols_lead
});


export default connect(mapStateToProps, {startLoading,updateUserPreference,updateReduxLeads,handletosetleadDetails,getLeadAnalyticsData,getAssignedAttorney, getEligibleAttorney,getAllAttorneysforfilter, updateallleadsfromsockets, updateLeadDetailsFromSockets })(LeadsTable)