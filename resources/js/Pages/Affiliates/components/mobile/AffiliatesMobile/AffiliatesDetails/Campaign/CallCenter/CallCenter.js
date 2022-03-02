import {Input, Typography, Checkbox, Select, Button} from 'antd';
import {FaRegPaperPlane} from 'react-icons/fa';
import {FaLink} from 'react-icons/fa';

const {Text} = Typography;
const {Option} = Select;
const { TextArea } = Input;

function CallCenter() {


    function onChange(value) {
        console.log(`selected ${value}`);
      }


    return (
        <div>
            <Text strong>Data Setting</Text>
            <div style={{marginTop:5, marginBottom:10}}>
                <div style={{marginTop:10, display:'flex', justifyContent:'space-between', width:'100%'}} >
                <Input style={{width:'59%'}} size='small' placeholder='Lead Source Provider Key'/>
                <Checkbox style={{width:'40%'}}>Send data to call center</Checkbox>
                </div>
                
            </div>

            <Text strong>Template Settings</Text>
            <Select
                size='small'
                showSearch
                style={{ width:'100%', marginBottom:10}}
                placeholder="Call Center Template"
                optionFilterProp="children"
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Option 1">Option 1</Option>
                <Option value="Option 2">Option 2</Option>
                <Option value="Option 3">Option 3</Option>
            </Select>

            <Text strong>Data Flow</Text>
            <div style={{marginBottom:10}}>
            <Select
                size='small'
                showSearch
                style={{ width:'100%', marginBottom:10}}
                placeholder="Direction"
                optionFilterProp="children"
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Option 1">Option 1</Option>
                <Option value="Option 2">Option 2</Option>
                <Option value="Option 3">Option 3</Option>
            </Select>

            <div style={{display:'flex'}}>
            <Select
                size='small'
                showSearch
                style={{ width:'100%', marginBottom:10}}
                placeholder="Twillio DID"
                optionFilterProp="children"
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Option 1">Option 1</Option>
                <Option value="Option 2">Option 2</Option>
                <Option value="Option 3">Option 3</Option>
            </Select>

            <Button size='small' type='primary'>Add</Button>
            </div>

            <div style={{display:'flex'}}>
            <Select
                size='small'
                showSearch
                style={{ width:'100%', marginBottom:10}}
                placeholder="Call Center DID"
                optionFilterProp="children"
                onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="Option 1">Option 1</Option>
                <Option value="Option 2">Option 2</Option>
                <Option value="Option 3">Option 3</Option>
            </Select>
            <Button size='small' type='primary'>Add</Button>
            </div>
            
            </div>

            <Text strong>Script Details <FaLink style={{marginLeft:5}}/> <FaRegPaperPlane style={{marginLeft:5}}/></Text>
            <TextArea rows={4}></TextArea>
        </div>
    )
}

export default CallCenter
