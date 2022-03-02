import React from 'react';
import {Typography} from 'antd';
import {AiFillGoogleCircle,AiFillChrome} from 'react-icons/ai'
import { connect } from "react-redux";
import PropTypes from "prop-types";

const {Text, Link} = Typography;

function Analytics({lead_analytics_data}) {
    console.log('data from the redux in analytics',lead_analytics_data);
    if(typeof lead_analytics_data == "string"){
        return(
            <>
            <Text>{lead_analytics_data}</Text>
            </>
        )
    }else{
        let page_urls_keys = Object.keys(lead_analytics_data.context_page_urls);
        console.log('pageurls',page_urls_keys);
        return (
            <div>
                <div style={{display:'flex', flexDirection:'column', marginBottom:'10px'}}>
                <Text type='secondary' ><b>lead-Gclid:</b> {(lead_analytics_data.lead_gclid==null)?"":lead_analytics_data.lead_gclid}</Text>
                <Text type='secondary' ><b>lead-arrived-on:</b> {(lead_analytics_data.lead_arrived_on==null)?"":lead_analytics_data.lead_arrived_on}</Text>
                <Text type='secondary' ><b>Lead-UUID:</b> {(lead_analytics_data.lead_uuid==null)?"":lead_analytics_data.lead_uuid}</Text>
                <Text type='secondary' ><b>Campaign:</b> {(lead_analytics_data.Campaign==null)?"":lead_analytics_data.Campaign}</Text>
                <Text type='secondary' ><b>CampaignId:</b> {(lead_analytics_data.CampaignId==null)?"":lead_analytics_data.CampaignId}</Text>
                <Text type='secondary' ><b>Content:</b> {(lead_analytics_data.Content==null)?"":lead_analytics_data.Content}</Text>
                <Text type='secondary' ><b>Medium:</b> {(lead_analytics_data.Medium==null)?"":lead_analytics_data.Medium}</Text>    
                <Text type='secondary' ><b>Term:</b>{(lead_analytics_data.Term==null)?"":lead_analytics_data.Term}</Text>
                <Text type='secondary' ><b>Source:</b> {(lead_analytics_data.Source==null)?"":<AiFillGoogleCircle/>}</Text>
                </div>
                
                
                <div style={{display:'flex', flexDirection:'column', marginBottom:'10px'}}>
                <Text type='secondary' strong><b>Full Story:</b> {(lead_analytics_data.full_story_url==null)?"":<Link>{lead_analytics_data.full_story_url}</Link>}</Text>
                <Text type='secondary'><b>Case Type:</b> {(lead_analytics_data.caseType==null)?"":lead_analytics_data.caseType}</Text>
                <Text type='secondary'><b>Context-Page-Referrer:</b> {(lead_analytics_data.context_page_referrer==null)?"":lead_analytics_data.context_page_referrer}</Text>
                <Text type='secondary'><b>Context-Campaign-Term:</b> {(lead_analytics_data.context_campaign_term==null)?"":lead_analytics_data.context_campaign_term}</Text> 
                </div>
                
    
                <div style={{display:'flex', flexDirection:'column', marginBottom:'10px'}}>
                <Text type='secondary' strong><b>loaded-at:</b> {lead_analytics_data.loaded_at}</Text>
                <Text type='secondary' strong><b>received-at:</b> {lead_analytics_data.received_at}</Text>
                </div>
                
                
                <div style={{display:'flex', flexDirection:'column'}}>
                <Text type='secondary' strong><b>Context Page Urls:</b></Text>
                    {
                        // Object.values(lead_analytics_data.context_page_urls)
                        // .map((e,index)=>{
                        //     return <Link key={index}>{e}</Link>
                        // })
    
                        page_urls_keys.map((key,index)=>{
                            return <Text type='secondary'><b>{key}:</b> {lead_analytics_data.context_page_urls[key]}</Text>
                        })
                    }
                </div>
                
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    lead_analytics_data: state.leads.lead_analytics_data
});

export default connect(mapStateToProps, null)(Analytics)

// Analytics Data
// lead-Gclid: CjwKCAjw_JuGBhBkEiwA...
// lead-arrived-on: 2021-06-14 17:35:53
// Manual-Conversion-Trigger: 
// Lead-UUID: 2703bd07-5f62-4cdd-9da7-b6a0743c05ad
// Campaign:
// CampaignId: https://ads.google.c...
// Content:
// Medium:
// Source: google
// Term: workman%27s%20comp%20lawyers
// Full-Story-Url: https://app.fullstor...
// caseType: Workers%20Comp
// Context-Page-Referrer: https://www.google.com/
// Context-Campaign-Term: workman's comp lawyers
// loaded-at: 06-15-2021 03:11:38
// received-at: 06-14-2021 17:44:17
// context-page-urls:
// 2021-06-14 17:30:22	https://www.accident.com/?i=Workers%20Compensation...
// 2021-06-14 17:35:56	https://www.accident.com/thank-you-new?uuid=2703bd...
// 2021-06-14 17:36:00	https://www.accident.com/thank-you/personal-injury...
// 2021-06-14 17:44:15	https://www.accident.com/wc/ca-workers-comp-lawyer...