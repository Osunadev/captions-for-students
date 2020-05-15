import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

export default class HomeMenu extends Component {
    state = {};

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleMenuItemClick = (e, data) => {
        const { history } = this.props;
        const registerOpt = data.children;

        history.push('/registro/' + registerOpt);
    };

    render() {
        const { activeItem } = this.state;

        return (
            <Menu stackable size="huge">
                <Menu.Item>
                    <Icon name="closed captioning" />
                    <strong>Captions for Students</strong>
                </Menu.Item>

                <Dropdown item text="Registro de Usuarios">
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleMenuItemClick}>
                            Estudiante
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.handleMenuItemClick}>
                            Profesor
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Item
                    name="subjects"
                    active={activeItem === 'subjects'}
                    onClick={this.handleItemClick}
                >
                    Registro de Asignaturas
                </Menu.Item>

                <Menu.Item
                    name="features"
                    active={activeItem === 'features'}
                    onClick={this.handleItemClick}
                >
                    Panel de Profesores
                </Menu.Item>

                <Menu.Item
                    name="testimonials"
                    active={activeItem === 'testimonials'}
                    onClick={this.handleItemClick}
                >
                    Panel de Estudiantes
                </Menu.Item>
            </Menu>
        );
    }
}
