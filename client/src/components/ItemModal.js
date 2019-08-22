import React, {Component} from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} 
from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ItemModal extends Component {

    constructor() {
        super()
        this.state = {
            modal: false,
            name: '',
        }
        this.onChange = this.onChange.bind(this)
        this.toggle = this.toggle.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
   

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }
        
    onSubmit(e) {
        e.preventDefault()
        const newItem = {
            name: this.state.name
        }

        this.props.addItem(newItem)
        this.toggle()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return(
            <div>
                { this.props.isAuthenticated ?  <Button color="dark" style={{marginBottom:'2rem'}}
                onClick={this.toggle}
                >
                    Add Item
                </Button> : <h4 className="mb-3 ml-4"> Please Login to manage items</h4>}
               
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                <ModalHeader toggle={this.toggle}>Add To To-Do List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="item">
                               New Item:
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                id="item"
                                placeholder="Add new To-Do list item"
                                onChange={this.onChange}
                            />
                              <Button color="dark" style={{marginTop:'2rem'}} block >Add Item</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { addItem })(ItemModal)