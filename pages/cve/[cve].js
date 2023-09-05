import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Post() {
    const [responseData, setResponseData] = useState(null);
    const router = useRouter()
    const { cve } = router.query; // 동적 경로에서 파라미터 추출

    useEffect(() => {
        // 백엔드에서 전달받은 데이터를 처리하기 위한 함수
        const processData = async () => {
            try {
                const response = await fetch(`http://54.180.109.131:5000/cve/detail/${cve}`);
            if (!response.ok) {
                throw new Error('데이터를 가져오는 데 실패하였습니다.');
            }
            console.log(response.data)
            const data = await response.json();
            console.log(data);
            // 데이터를 상태에 저장하여 컴포넌트에서 사용할 수 있도록 합니다.
            setResponseData(data);
            } catch (error) {
            console.error('데이터 처리 중 오류 발생:', error);
            }
        };

        processData();
    }, []);

  return (
    <div>
      <h1>Post: {cve}</h1>
      {responseData}
    </div>
  );
}