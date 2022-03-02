import React from 'react';

const CaseHistory = ({case_history}) => {
    return (
        <div style={{width:'100%'}}>
             <div style={{width:'100%', marginTop:'10px'}}>
                <div style={{fontWeight:'bold'}}>Case History:</div>
                <div style={{width:'100%',marginTop:'10px'}}>
                    
                    {
                        case_history ? case_history.map((data,index)=>{
                            return( 
                                <p>
                                    <div> {`Q${index+1}. ${data.question}`}</div>
                                    <div> {`A: ${data.answer}`}</div>
                                </p>
                            )
                        }) :
                        (
                            <>
                                <p>
                                    <div> Q1. How long ago did the injury happen?</div>
                                    <div> A: Less than 1 year</div>
                                </p>

                                <p>
                                    <div> Q2. Did the injury require hospitalization, medical treatment, or surgery?</div>
                                    <div> A: Yes</div>
                                </p>

                                <p>
                                    <div> Q3. Were you at fault for the accident?</div>
                                    <div> A: No</div>
                                </p>

                                <p>
                                    <div> Q4. Do you already have a lawyer representing you?</div>
                                    <div> A: No</div>
                                </p>

                                <p>
                                    <div> Q5. What is the primary type of injury?</div>
                                    <div> A: Other</div>
                                </p>

                                <p>
                                    <div> Q6. Were you injured?</div>
                                    <div> A: Yes</div>
                                </p>

                                <p>
                                    <div> Q7. Position of power held by the abuser?</div>
                                    <div> A: Motorcycle Accident</div>
                                </p>

                                <p>
                                    <div>  Q8. Describe your case</div>
                                    <div> A: I was in a motorcyycle accident on June 14 2020. I had a few injuries but the worst one is my broken foot. I did not have insurance and I couldnt work any more and my foot is so bad off that I dont thinm I will ever be able to walk cometelynormalagain and</div>
                                </p>

                                <p>
                                    <div>  Q9. Please read and accept our Terms of Service</div>
                                    <div> A: I accept</div>
                                </p>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CaseHistory
