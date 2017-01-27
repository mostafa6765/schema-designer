import React, { Component, PropTypes } from 'react';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';

const tableTooltip = (
    <Tooltip id='tooltip'><strong>Create New Table</strong></Tooltip>
);

const trashTooltip = (
    <Tooltip id='tooltip'><strong>Clear Current Schema</strong></Tooltip>
);

class Header extends Component {
    clearSchemaData = () => {
        window.localStorage.removeItem('schema');
        window.location.reload();
    }

    toggleDbModal = () => {
        const editMode = true;
        this.props.onToggleDbModal(editMode);
    }

    render() {
        const { dbName, onToggleTableModal } = this.props;

        return (
            <header>
                <div className='container'>
                    <div className='row'>
                        <div className='title col-xs-4 text-left'>
                            <strong>Schema Builder</strong>
                            <sub>by <a href='https://github.com/Agontuk'>Agontuk</a></sub>
                        </div>
                        <div className='db-name col-xs-4 text-center'>
                            <span><i className='fa fa-database'></i> { dbName }</span>
                            { !!dbName &&
                                <sup>
                                    <button
                                        className='glyphicon glyphicon-edit'
                                        onClick={ this.toggleDbModal }
                                    >
                                    </button>
                                </sup>
                            }
                        </div>
                        <div className='menu col-xs-4 text-right'>
                            <ul className='list-inline'>
                                <li>
                                    <OverlayTrigger placement='bottom' overlay={ tableTooltip }>
                                        <button
                                            className='glyphicon glyphicon-plus'
                                            onClick={ onToggleTableModal }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>
                                <li>
                                    <OverlayTrigger placement='bottom' overlay={ trashTooltip }>
                                        <button
                                            className='glyphicon glyphicon-trash'
                                            onClick={ this.clearSchemaData }
                                        >
                                        </button>
                                    </OverlayTrigger>
                                </li>
                                { typeof schema === 'object' &&
                                    window.schema.packageMode &&
                                    <li><button className='glyphicon glyphicon-download-alt'></button></li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    dbName: PropTypes.string.isRequired,
    onToggleDbModal: PropTypes.func.isRequired,
    onToggleTableModal: PropTypes.func.isRequired
};

export default Header;