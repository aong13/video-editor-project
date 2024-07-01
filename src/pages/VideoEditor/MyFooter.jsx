import React from 'react';
import { Layout } from 'antd';
import './MyFooter.module.css';
import { Button, Modal, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import logo from '../../assets/icons/ffmpeg.png';
const { Footer } = Layout;

const MyFooter = () => {
    return (
        <Footer className="custom-footer">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="footer-left">
                    <img src={logo} alt="logo" style={{ width: 40 }} />
                    <div className="contact-info">
                        <p>Tel. 02-2023-2024</p>
                        <p>E-mail: iedong@naver.com</p>
                    </div>
                </div>
                <div class="footer-right">
                    <nav style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                        <Button style={{ position: 'relative', marginRight: 0, paddingBottom: '10px', backgroundColor: 'white', color: 'Black', border: 'none', fontWeight: 'bold' }}>
                            비디오 편집
                        </Button>
                        <Button style={{ position: 'relative', paddingBottom: '10px', backgroundColor: 'white', color: 'Black', border: 'none' }}>
                            이미지 편집
                        </Button>
                        <Button style={{ position: 'relative', paddingBottom: '10px', backgroundColor: 'white', color: 'Black', border: 'none' }}>
                            로그인
                        </Button>
                    </nav>
                </div>

            </div>
        </Footer >
    );

};

export default MyFooter;
