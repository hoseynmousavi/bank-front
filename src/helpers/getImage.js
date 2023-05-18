function getImage(fid)
{
    if (fid)
    {
        return process.env.REACT_APP_REST_URL + "/" + fid
    }
    else
    {
        return fid
    }
}

export default getImage