import Button from '@material-ui/core/Button';
const Header = () => {
    return(
        <>
            <div style={{display:'flex', justifyContent:'space-between', fontSize:'30px', padding:'20px'}}>
                <b>Orders</b>
                <Button
                variant="contained"
                color="primary"
                style={{borderRadius:'10px'}}
      >
        CREATE NEW
      </Button>
            </div>
        </>
    )
}

export default Header;