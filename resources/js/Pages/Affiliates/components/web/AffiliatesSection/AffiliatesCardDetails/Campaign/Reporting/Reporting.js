import React,{useState, useCallback, useRef, useEffect} from 'react';
import { PageHeader, Card, Button, Popover, Dropdown, Menu, Tabs, Select, Input, Checkbox, Table, Space, Radio, Switch } from 'antd';
import { GrSend } from 'react-icons/gr';
import {FaLink} from 'react-icons/fa';
import { AiFillEdit } from 'react-icons/ai';
import { IoTrashBin } from 'react-icons/io5';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
// import arrayMove from 'array-move';

// import { DndProvider, useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";


const { TabPane } = Tabs;
const { Option, OptGroup } = Select;

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

  // let sheetdataformat = [
  //     {A:'First Name'},
  //     {B:'Last Name'},
  //     {C:'Email'},
  //     {D:'Phone'},
  //     {E:'Address'},
  //     {F:'State'},
  // ]

  let sheetdataformat = {
    "A":"First Name",
    "B":'Last Name',
    "C":'Email',
    "D":'Phone',
    "E":'Address',
    "F":'State'
  }
  
  const datasheet = [
    {
      key: '1',
      fieldname: 'First Name',
      column: 'A',
      index: 0,
    },
    {
      key: '2',
      fieldname: 'Last Name',
      column: 'B',
      index: 1,
    },
    {
      key: '3',
      fieldname: 'Email',
      column: 'C',
      index: 2,
    },
  ];
  
//   const SortableItem = sortableElement(props => <tr {...props} />);
//   const SortableContainer = sortableContainer(props => <tbody {...props} />);

    //new
    const type = "DragableBodyRow";

    const DragableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
    }) => {
    const ref = useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
        // console.log('monitor.getItem() ',monitor.getItem())
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
            return {};
        }
        return {
            isOver: monitor.isOver(),
            dropClassName:
            dragIndex < index ? " drop-over-downward" : " drop-over-upward"
        };
        },
        drop: (item) => {
        moveRow(item.index, index);
        }
    });
    const [, drag] = useDrag({
        type,
        item: { index },
        collect: (monitor) => ({
        isDragging: monitor.isDragging()
        })
    });
    drop(drag(ref));
    // console.log('ref ',ref)
    return (
        <tr
        ref={ref}
        className={`${className}${isOver ? dropClassName : ""}`}
        style={{ cursor: "move", ...style }}
        {...restProps}
        />
    );
    };

const Reporting = ({editmode}) => {

    // const [dataSource, setdataSource] = useState(data);
    const [data, setData] = useState([])
    const [rowSwap, setrowSwap] = useState(false);
    const [colkeys,setcolkeys] = useState([]);

    const columns = [
        {
          title: '#',
          dataIndex: 'sort',
          width: 30,
          align:'center',
          className: 'drag-visible',
          render: () => <DragHandle />,
        },
        {
          title: 'Field Name',
          dataIndex: 'fieldname',
          key:'fieldname',
          align:'center',
          className: 'drag-visible',
        },
        {
          title: 'Column',
          dataIndex: 'column',
          key:'column',
          align:'center',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          align:'center',
          render: (_, record) =>{
            return (
                <Space size="middle">
                    <Radio.Group>
                        <Button size={"small"} disabled={editmode} type={'danger'} onClick={()=>handleOnclickDelete(record)}><IoTrashBin /></Button>
                    </Radio.Group>
                </Space>
            )
          },
        },
      ];

    useEffect(() => {
        onload()
    },[])


    useEffect(() => {
        console.log("data ", data);
        // console.log('colkeys',colkeys)
        let olddata = [];
        if(data.length >0){
            olddata = [...data];
            let swaparr = [];
            // console.log("olddata ", olddata);
            olddata.map((dataobj,index)=>{
            console.log('Object.values(dataobj) ',Object.values(dataobj))
            swaparr.push({key: index, fieldname: dataobj.fieldname, column: colkeys[index],index: index})
            })
            console.log('swaparr ',swaparr)
            setData(swaparr);
        }
        else{
            // let arr = [];
            // // let ckeys = [];
            // sheetdataformat.map((dataobj,index)=>{
            //  //    console.log('data ',data)
            //  arr.push({key: index, fieldname: Object.values(dataobj)[0], column: Object.keys(dataobj)[0],index: index});
            // //  ckeys.push(Object.keys(dataobj)[0]);
            // })
            // console.log('arr else',arr);
            // olddata = [...arr];
        }
        
      }, [rowSwap]);

      const onload = () =>{
        // let arr = [];
        // let ckeys = [];
        // sheetdataformat.map((dataobj,index)=>{
        //  //    console.log('data ',data)
        //  arr.push({key: index, fieldname: Object.values(dataobj)[0], column: Object.keys(dataobj)[0],index: index});
        //  ckeys.push(Object.keys(dataobj)[0]);
        // })

        let arr = [];
        let ckeys = [...Object.keys(sheetdataformat)];
        let cvalues = [...Object.values(sheetdataformat)];
        console.log('ckeys ',ckeys,cvalues)
        ckeys.map((dataobj,index)=>{
         //    console.log('data ',data)
         arr.push({key: index, fieldname: cvalues[index], column: dataobj,index: index});
        //  ckeys.push(Object.keys(dataobj)[0]);
        })

        console.log('arr ',arr);
        setcolkeys(ckeys);
        setData(arr);
       
      }

      const handleOnclickDelete = (record) =>{
        let dataarr = [...data];
        const filteredarray = dataarr.filter((item) => item.index !== record.index);
        let newkeys = [...colkeys];
        //to remove col name
        var indexofcol = newkeys.indexOf(record.column);
            if (indexofcol !== -1) {
                newkeys.splice(indexofcol, 1);
            }
        setData(filteredarray);
        setrowSwap(!rowSwap);
        // setcolkeys(newkeys);
      }

    // const onSortEnd = ({ oldIndex, newIndex }) => {
    //     // const { dataSource } = this.state;
    //     if (oldIndex !== newIndex) {
    //       const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
    //       console.log('Sorted items: ', newData);
    //     //   this.setState({ dataSource: newData });
    //         setdataSource(newData)
    //     }
    //   };
    
    // const DraggableContainer = props => (
    //     <SortableContainer
    //       useDragHandle
    //       disableAutoscroll
    //       helperClass="row-dragging"
    //       onSortEnd={onSortEnd}
    //       {...props}
    //     />
    //   );
    
    // const DraggableBodyRow = ({ className, style, ...restProps }) => {
    //     // const { dataSource } = this.state;
    //     // function findIndex base on Table rowKey props and should always be a right array index
    //     const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    //     return <SortableItem index={index} {...restProps} />;
    //   };


      //////////////////////////
      const components = {
        body: {
          row: DragableBodyRow
        }
      };


      const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
          const dragRow = data[dragIndex];
          setData(
            update(data, {
              $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow]
              ]
            })
          );
          setrowSwap(!rowSwap);
        },
        [data]
      );

console.log('main data ',data)
    return (
        <div style={{width:'100%'}}>
            <div style={{width:'100%',display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                <div style={{fontSize:'18px',fontWeight:'500'}}>Google Sheet</div>
                <div style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'flex-end',flexWrap:'wrap'}}>
                    <div style={{marginRight:window.innerWidth <= 575?'0%':'20px',marginBottom:'10px',minWidth:window.innerWidth <= 575?'100%':'250px',width:'30%'}}>
                        <div>Live</div>
                        <div style={{position:'relative',display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Input disabled={editmode} />
                            <div style={{position:'absolute',right: '5px',top:'7px',display:'flex',flexDirection:'row'}}>
                                <div style={{marginRight:'10px'}}><FaLink size={18} /></div>
                                <div><GrSend size={18} /></div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginRight:window.innerWidth <= 575?'0%':'20px',marginBottom:'10px',minWidth:window.innerWidth <= 575?'100%':'250px',width:'30%'}}>
                        <div>Test</div>
                        <div style={{position:'relative',display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <Input disabled={editmode} />
                            <div style={{position:'absolute',right: '5px',top:'7px',display:'flex',flexDirection:'row'}}>
                                <div style={{marginRight:'10px'}}><FaLink size={18} /></div>
                                <div><GrSend size={18} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width:'100%',marginTop:'10px'}}>
                <div style={{marginBottom:'15px',fontSize:'18px'}}>
                    Customise Reporting Field
                </div>
                {/* <Table
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns}
                    rowKey="index"
                    components={{
                    body: {
                        wrapper: DraggableContainer,
                        row: DraggableBodyRow,
                    },
                    }}
                /> */}
                {/* <DndProvider backend={HTML5Backend}>
                    <Table
                        columns={columns}
                        size={'small'}
                        pagination={false}
                        dataSource={data}
                        components={!editmode?components:null}
                        onRow={(record, index) => ({
                        index,
                        moveRow
                        })}
                    />
                </DndProvider> */}
            </div>
        </div>
    )
}

export default Reporting;
