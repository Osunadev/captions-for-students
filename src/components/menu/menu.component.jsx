import React from 'react';
import { Menu, Dropdown, Icon } from 'semantic-ui-react';

import uabcLogo from '../../assets/uabc-logo-white.png';

const HomeMenu = ({ history }) => {
    const handleDropdownItem = (e, data) => {
        const registerOpt = data.children;

        history.push('/registro/' + registerOpt.toLowerCase());
    };

    const handleMenuItem = (e, { name }) => history.push('/' + name);

    return (
        <Menu
            stackable
            size="large"
            style={{
                position: 'sticky',
                top: 0,
                borderRadius: 0,
                zIndex: 100,
                fontFamily: 'ProximaNova',
                backgroundColor: '#00723F',
            }}
        >
            <Menu.Item
                style={{ color: 'white' }}
                onClick={() => history.push('/')}
            >
                <img src={uabcLogo} />
            </Menu.Item>

            <Dropdown
                item
                style={{ color: 'white' }}
                text="Registro de Usuarios"
            >
                <Dropdown.Menu>
                    <Dropdown.Item
                        icon="user plus"
                        onClick={handleDropdownItem}
                    >
                        Estudiante
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDropdownItem}>
                        Profesor
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Menu.Item
                style={{ color: 'white' }}
                name="profesores"
                onClick={handleMenuItem}
            >
                <Icon name="users" />
                Panel de Profesores
            </Menu.Item>

            <Menu.Item
                style={{ color: 'white' }}
                name="estudiantes"
                onClick={handleMenuItem}
            >
                <Icon name="student" />
                Panel de Estudiantes
            </Menu.Item>

            <Menu.Item
                style={{ color: 'white' }}
                name="asignaturas"
                onClick={handleMenuItem}
            >
                <Icon name="book" />
                Registro de Asignaturas
            </Menu.Item>
        </Menu>
    );
};

export default HomeMenu;
