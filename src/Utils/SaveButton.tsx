import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

interface SaveButtonProps {
    loading?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'contained' | 'outlined' | 'text';
    text?: string;
    loadingText?: string;
}

export default function SaveButton({
    loading = false,
    onClick,
    disabled = false,
    variant = 'outlined',
    text = 'Save',
    loadingText = 'Saving...'
}: SaveButtonProps) {
    return (
        <Button
            startIcon={!loading ? <SaveIcon /> : undefined}
            variant={variant}
            onClick={onClick}
            disabled={disabled || loading}
            sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '16px',
                boxShadow: variant === 'contained' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
                '&:hover': {
                    boxShadow: variant === 'contained' ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                    transform: 'translateY(-1px)',
                },
                '&:active': {
                    transform: 'translateY(0)',
                },
                transition: 'all 0.2s ease-in-out',
                ...(variant === 'contained' && {
                    backgroundColor: '#2563eb',
                    '&:hover': {
                        backgroundColor: '#1d4ed8',
                        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                        transform: 'translateY(-1px)',
                    }
                })
            }}
        >
            {loading ? loadingText : text}
        </Button>
    );
}
