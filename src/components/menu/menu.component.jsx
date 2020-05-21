import React from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

const HomeMenu = ({ history }) => {
    const handleDropdownItem = (e, data) => {
        const registerOpt = data.children;

        history.push('/registro/' + registerOpt.toLowerCase());
    };

    const handleMenuItem = (e, { name }) => history.push('/' + name);

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
                    <Dropdown.Item onClick={handleDropdownItem}>
                        Estudiante
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDropdownItem}>
                        Profesor
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Menu.Item name="profesores" onClick={handleMenuItem}>
                Panel de Profesores
            </Menu.Item>

            <Menu.Item name="estudiantes" onClick={handleMenuItem}>
                Panel de Estudiantes
            </Menu.Item>

            <Menu.Item name="asignaturas" onClick={handleMenuItem}>
                Registro de Asignaturas
            </Menu.Item>
        </Menu>
    );
};

export default HomeMenu;
