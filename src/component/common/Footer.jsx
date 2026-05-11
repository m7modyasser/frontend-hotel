const FooterComponent = () => {


    return (
        <footer style={{ width: '100%', marginTop: 'auto' }}>
            <div className="my-footer" style={{ width: '100%', display: 'block', padding: '40px 5%' }}>
                Phegon Hotel | All Rights Reserved &copy; {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default FooterComponent;
