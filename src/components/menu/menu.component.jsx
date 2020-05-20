import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

const HomeMenu = ({ history }) => {
    const handleMenuItemClick = (e, data) => {
        const registerOpt = data.children;

        history.push('/registro/' + registerOpt.toLowerCase());
    };

    return (
        <Menu
            stackable
            size="huge"
            style={{ position: 'sticky', top: 0, zIndex: 100 }}
        >
            <Menu.Item>
                <Icon name="closed captioning" />
                <strong>Captions for Students</strong>
            </Menu.Item>

            <Dropdown item text="Registro de Usuarios">
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleMenuItemClick}>
                        Estudiante
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleMenuItemClick}>
                        Profesor
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Menu.Item name="subjects">Registro de Asignaturas</Menu.Item>

            <Menu.Item name="features">Panel de Profesores</Menu.Item>

            <Menu.Item name="testimonials">Panel de Estudiantes</Menu.Item>
        </Menu>
    );
};

export default HomeMenu;
