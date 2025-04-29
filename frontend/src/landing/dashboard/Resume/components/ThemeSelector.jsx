import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { LayoutGrid } from 'lucide-react';

const themes = [
    { name: 'Blue', color: '#0d6efd' },    { name: 'Green', color: '#198754' },
    { name: 'Purple', color: '#6f42c1' }, { name: 'Red', color: '#dc3545' },
    { name: 'Orange', color: '#fd7e14' },  { name: 'Teal', color: '#20c997' },
    { name: 'Yellow', color: '#ffc107' },  { name: 'Pink', color: '#d63384' },
    { name: 'Gray', color: '#6c757d' },    { name: 'Black', color: '#000000' },
    { name: 'Brown', color: '#a52a2a' },  { name: 'Gold', color: '#ffd700' },
];

export default function ThemeSelector({ currentTheme, onThemeChange }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Button 
                variant="outlined" 
                color="info" 
                onClick={handleClick}
                startIcon={<LayoutGrid />}
            >
                Theme
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className="p-3" style={{ width: '200px' }}>
                    <h6 className="mb-3">Select Theme Color</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {themes.map((theme) => (
                            <div
                                key={theme.name}
                                onClick={() => {
                                    onThemeChange(theme.color);
                                    handleClose();
                                }}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: theme.color,
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    border: currentTheme === theme.color ? '2px solid #000' : 'none',
                                    transition: 'transform 0.2s',
                                }}
                                className="hover-scale"
                            />
                        ))}
                    </div>
                </div>
            </Popover>
        </>
    );
} 