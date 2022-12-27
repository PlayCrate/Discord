import fetch from "node-fetch";

interface Query {
     operationName: string;
     query: string;
     variables: {
          id?: string;
          emote_id?: string;
     };
}

const makeRequest = async (url: Query): Promise<any> => {
     const response = await fetch(`https://7tv.io/v3/gql`, {
          method: "POST",
          headers: {
               "Content-Type": "application/json"
          },
          body: JSON.stringify(url)
     });

     const json = await response.json();
     return json;
};

export const GetEmote = async (id?: string): Promise<any> => {
     const query = {
          operationName: "Emote",
          query: `query Emote($id: ObjectID!) {
		emote(id: $id) {
			id
			created_at
			name
			lifecycle
			tags
            animated
			host {
				...HostFragment
			}
		}
	}

	fragment HostFragment on ImageHost {
		url
		files {
			name
			format
			width
			height
			size
		}
	}`,
          variables: {
               id: id
          }
     };

     const response = await makeRequest(query);
     if (response?.errors) {
          return {
               success: false,
               data: null,
               message: response.errors[0].message
          };
     }

     return {
          success: true,
          data: response.data
     };
};
