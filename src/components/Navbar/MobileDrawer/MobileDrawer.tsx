import { Drawer, Box, List, ListItem, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";

interface MobileDrawerProps {
    isMobileOpen: boolean;
    setIsMobileOpen: (open: boolean) => void;
    handleNavigation: (path: string) => void;
    isAuthenticated: boolean;
    NAV_ITEMS: { label: string; path: string; icon: any }[];
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isMobileOpen, setIsMobileOpen, handleNavigation, isAuthenticated, NAV_ITEMS }) => {
    return (
        <Drawer
            anchor="right"
            open={isMobileOpen}
            onClose={() => setIsMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
        >
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <ListItem key={item.label} disablePadding>
                                <Button
                                    fullWidth
                                    onClick={() => handleNavigation(item.path)}
                                    startIcon={<Icon size={20} />}
                                    sx={{ justifyContent: 'flex-start', px: 3, py: 1.5, color: 'text.primary' }}
                                >
                                    {item.label}
                                </Button>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider />
                {!isAuthenticated && (
                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Button component={Link} to="/signin" variant="outlined" fullWidth onClick={() => setIsMobileOpen(false)}>Sign In</Button>
                        <Button component={Link} to="/signup" variant="contained" fullWidth onClick={() => setIsMobileOpen(false)}>Sign Up</Button>
                    </Box>
                )}
            </Box>
        </Drawer>
    )
}

export default MobileDrawer