class ApiService {
    private BASE_URL: string;

    constructor() {
        this.BASE_URL = process.env.REACT_APP_URL || "";
    }

    private async handleResponse(response: Response) {
        console.log(response)
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Something went wrong");
        }
        return { 'status': response.status, 'body': await response.json() };
    }

    public async get(path: string) {
        const url = `${this.BASE_URL}/${path}`;
        const response = await fetch(url);
        return this.handleResponse(response);
    }

    public async post(path: string, data: any) {
        const url = `${this.BASE_URL}/${path}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return this.handleResponse(response)
    }
}

export default ApiService;
