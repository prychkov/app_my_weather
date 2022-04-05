
function Error({error}) {
    return (
        <div>
            <h1>{`Error, ${error.message}, please try again`}</h1>
        </div>
    );
}

export default Error;