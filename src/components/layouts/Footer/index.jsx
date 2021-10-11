
import 'antd/dist/antd.css';
import './style.css';
import { FacebookOutlined, IeOutlined, TwitterOutlined } from "@ant-design/icons";
import { Row, Col } from 'antd';


function FooterPage() {
    return (
        // <Row>
        //     <Col span={24}>
        //         <div className="buttom">
        //             {/* <div>
        //                 <IeOutlined style={{ fontSize: '20px', color: 'red' }} />
        //             </div> */}
        //             <div className="keyword">
        //                 <h2 className="noteFooter">Thông tin địa điểm</h2>
        //                 <div>
        //                     <span>Khu vực</span>
        //                 </div>
        //                 <div>

        //                     <span>Sân bay</span>
        //                 </div>
        //                 <div>

        //                     <span>Khách sạn</span>
        //                 </div>
        //                 <span>Điểm được quan tâm</span>

        //             </div>
        //             <div className="keyword">
        //                 <h2 className="noteFooter">Thông tin cần biết</h2>
        //                 <div>
        //                     <div>

        //                         <span>Điều Kiện và Điều khoản</span>
        //                     </div>
        //                     <div>

        //                         <span>Quy chế thường gặp</span>
        //                     </div>
        //                     <div>

        //                         <span>Câu hỏi thường gặp</span>
        //                     </div>
        //                     <span>Điểm được quan tâm</span>
        //                 </div>
        //             </div>
        //             <div className="keyword">
        //                 <h2 className="noteFooter">Đối tác</h2>
        //                 <div>
        //                     <div>

        //                     <span>Quy chế bảo hiểm</span>
        //                     </div>
        //                     <div>

        //                     <span>Yêu cầu bồi thường</span>
        //                     </div>
        //                     <div>

        //                     <span>Quy chế trả góp</span>
        //                     </div>
        //                     <span>Resort</span>
        //                 </div>
        //             </div>
        //       {/* <div>
        //             <h1 style={{marginBottom: 10, fontWeight: 700}}>Các trang mạng xã hội</h1>
        //             <div className="chuaicon">
        //         <div>
        //             <a href="https://facebook.com/iVIVU"></a>
        //             <FacebookOutlined className="iconMXH" style={{marginRight: 50}}/>
        //         </div>
        //         <div>
        //             <a href=""></a>
        //             <IeOutlined  className="iconMXH" style={{marginRight: 50}}/>
        //         </div>
        //         <div>
        //             <a href=""></a>
        //              <TwitterOutlined className="iconMXH" style={{marginRight: 50}}/>
        //         </div>
        //       </div> */}
        //       {/* </div> */}
        //         </div>

        //     </Col>
        // </Row>

        <>
            <div style={{ backgroundColor: "#e0e7ef", display: "flex", justifyContent: "center" }}>
                <div style={{ padding: '10px 50px', maxWidth: 1400, width: "100%" }}>
                    <Row>
                        <Col span={5}>
                            <div className="keyword">
                                <h2 className="noteFooter">Thông tin địa điểm</h2>
                                <div>
                                    <span>Khu vực</span>
                                </div>
                                <div>

                                    <span>Sân bay</span>
                                </div>
                                <div>

                                    <span>Khách sạn</span>
                                </div>
                                <span>Điểm được quan tâm</span>

                            </div>
                        </Col>
                        <Col span={5}>
                            <div className="keyword">
                                <h2 className="noteFooter">Thông tin cần biết</h2>
                                <div>
                                    <div>

                                        <span>Điều Kiện và Điều khoản</span>
                                    </div>
                                    <div>

                                        <span>Quy chế thường gặp</span>
                                    </div>
                                    <div>

                                        <span>Câu hỏi thường gặp</span>
                                    </div>
                                    <span>Điểm được quan tâm</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={5}>
                            <div className="keyword">
                                <h2 className="noteFooter">Đối tác</h2>
                                <div>
                                    <div>
                                        <span>Quy chế bảo hiểm</span>
                                    </div>
                                    <div>
                                        <span>Yêu cầu bồi thường</span>
                                    </div>
                                    <div>

                                        <span>Quy chế trả góp</span>
                                    </div>
                                    <span>Resort</span>
                                </div>
                            </div>

                        </Col>
                        <Col span={5}>
                        <h2 className="noteFooter">Được chứng nhận</h2>
                        <div >

                        <a href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=21871">
                            <img alt="" title="" src="https://www.ivivu.com/du-lich/content/img/bocongthuong.png"/>
                        </a>
                        </div>
                            
                </Col>
                        <Col span={4}>
                        <h2 className="noteFooter">Kết nối với iVivu</h2>
                        <div class="messageIcons">
                            
                            <a href="viber://add?number=84906355542"><img src="https://www.ivivu.com/du-lich/content/img/icon-viber.jpg" alt="iVIVU Viber" class="img-circle"/></a>
                            <a href="https://zalo.me/84906355542"><img src="https://www.ivivu.com/du-lich/content/img/icon-zalo.jpg" alt="iVIVU Zalo" class="img-circle"/></a>
                        </div>
                            
                </Col>

                    </Row>
                    <Row>
                        <Col span={16}>
                            <div class="footerContact footerPanel">
                                <div style={{marginTop:10}}>
                                    <a className="worldTravelAwards" href="https://www.worldtravelawards.com/award-vietnams-leading-online-travel-agency-2020" target="_blank">
                                        <img alt="" title="Vietnams leading online travel agency 2020 winner" src="https://www.ivivu.com/du-lich/content/img/vietnams-leading-online-travel-agency-2020-winner.png"/>
                                        <span>bookingTourHotel.com © 2020 - Đại lý Du lịch Hàng đầu Việt Nam 2020</span>
                                    </a>
                                    <div class="v-margin-top-15 hidden-xs">
                                        <p>
                                            <b>DKKD: 0312788481, Ngày cấp: 21/05/2014, Sở kế hoạch đầu tư thành phố Đà Nẵng</b>
                                        </p>
                                        <p>
                                            <b>ĐN:</b> Lầu 7, Tòa nhà Anh Đăng, 215 Nam Kỳ Khởi Nghĩa, Phường 7, Quận Sơn Trà, Tp. Đà Nẵng
                                    </p>
                                        <p>
                                            <b>ĐN:</b> Tầng 1, Tòa nhà Ladeco, 266 Đội Cấn, Phường Liễu Giai, Quận Liên Chiểu, Đà Nẵng
                                    </p>
                                        <p>
                                            <b>ĐN:</b> Tầng 7 - Tòa nhà STS - 11B Đại Lộ Hòa Bình, P. Tân An, Q. Cẩm Lệ, Đà Nẵng.
                                    </p>

                                    </div>
                                </div>
                                
                            </div>
                        </Col>
                        <Col span={8}>
                        <div>
                                <span class="bestBookingSystemSpan">Bạn cần trợ giúp? <b>Hãy gọi ngay</b></span>
                                <div class="v-margin-top-15">
                                    <p>
                                        <i class="glyphicon glyphicon-earphone vcolor-gray fixGlyphicon"></i>
                                        <b>CSKH:</b> <a href="tel:02839338002">0975 631 600</a>
                                    </p>
                                    <p>
                                        <i class="glyphicon glyphicon-earphone vcolor-gray fixGlyphicon"></i>
                                        <b>Hotline:</b> <a href="tel:0906355542">0702 355 542</a>
                                    </p>
                                    <p>
                                        <i class="glyphicon glyphicon-time vcolor-gray fixGlyphicon"></i> Từ 8h30 - 18h hằng ngày
                                    </p>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 no-padding socialIcons hidden-xs">
                                    <span itemscope="" itemtype="http://schema.org/Organization">
                                        <a itemprop="sameAs" href="https://facebook.com/iVIVU" target="_blank" class="v-margin-right-5">
                                            <i class="fa fa-facebook facebook-icon" title="Facebook iVIVU"></i>
                                        </a>
                                        <a itemprop="sameAs" href="https://twitter.com/#!/ivivudotcom" target="_blank" class="v-margin-left-5 v-margin-right-5">
                                            <i class="fa fa-twitter twitter-icon" title="Twitter iVIVU"></i>
                                        </a>
                                        
                                        <a itemprop="sameAs" href="https://www.instagram.com/ivivu/" target="_blank" class="v-margin-right-5">
                                            <i class="fa fa-instagram instagram-icon" title="Instagram iVIVU"></i>
                                        </a>
                                        <a itemprop="sameAs" href="https://www.youtube.com/channel/UC7_UHi9BBHFXJViCQEcplQg" target="_blank" class="v-margin-left-5 v-margin-right-5">
                                            <i class="fa fa-youtube-play youtube-icon" title="Youtube iVIVU"></i>
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}
export default FooterPage;