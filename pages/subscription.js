export default function Subscription () {
    return (
        <div>
            <div className="subscription_title">
                <h3 className="text-center text-4xl font-bold my-30">Information for Subscription</h3>
                <p className="text-center text-l">Fill in the favorite and Receive our analysis information</p>
            </div>
            <div className="subscription_contents flex flex-col items-center my-30">
                <div className="subscription_content">
                    <label className="subscription_content_name">e-mail</label>
                    <div className="input_area">
                        <input type="text" />
                    </div>
                </div>

                <div className="subscription_content">
                    <label className="subscription_content_name">kakao talk</label>
                    <div className="input_area">
                        <input type="text" />
                    </div>
                </div>

                <div className="subscription_content">
                    <label className="subscription_content_name">tags</label>
                    <div className="input_area">
                        <input type="text" />
                    </div>
                </div>

                <div className="subscription_content">
                    <label className="subscription_content_name">SBOM</label>
                    <div className="input_area">
                        <input type="text" />
                    </div>
                </div>
            </div>

            <style jsx>{`
            .subscription_title h3{
                padding: 10px 0;
                margin: 0px auto;
            }

            .subscription_title p{
                padding: 10px 0;
                margin: 0px auto;
            }

            .subscription_content {
                width: 100%;
                margin: 10px auto;
                justify-content: center;
                display:flex;
                flex-direction: column;
                align-items: center;
            }
            .input_area {
                border: solid 1px black;
                border-radius: 4px;
                height: 35px;
                padding: 3px;
                width: 100%;
            }
            .subscription_content_name {

            }
            `}</style>
        </div>
    )
}